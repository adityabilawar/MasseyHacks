import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXNb1rll46E0RMCdfgo6TtTPx0bS8K294",
  authDomain: "empowerbot-nywy.firebaseapp.com",
  projectId: "empowerbot-nywy",
  storageBucket: "empowerbot-nywy.appspot.com",
  messagingSenderId: "868454263509",
  appId: "1:868454263509:web:c38af92f0ea3a316e3905c",
  measurementId: "G-3QYDXW4Q5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = firebase.firestore();



const servers = { 
  iceServers: [{
    urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
  },
],
iceCandidatePoolSize: 10,
};
//global state
let pc = new RTCPeerConnection(servers);
let localStream = null; 
let remoteStream = null;

const webcamButton = document.getElementById ('webcamButton') ;
const webcamVideo = document.getElementById ('webcamVideo') ;
const callButton = document.getElementById ('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById ('answerButton');
const remoteVideo = document.getElementById ('remotevideo') ;
const hangupButton = document.getElementById ('hangupButton');


// setting up the media sources

webcamButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({video: true, audio:true});
  remoteStream = new MediaStream();

  //Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  //pull tracks from remote stream, add to video stream
  pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };
  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  // 2.  Create an offer
  callButton.onclick = async() => {
    //reference firestore collection
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    callInput.value = callDoc.id;

    //get candidates for called to save to db
    pc.onicecandidate = event =>{
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    //Create offer 
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    await callDoc.set({ offer });

    //Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if(!pc.currentRemoteDescription && data?.answer){
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
    });

    // when answered, add candidate to peer connection
    answerCandidates.onSnapshot(snapshot =>{
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
    };




    answerButton.onclick = async () => {
      const callId = callInput.value;
      const callDoc = firestore.collection('calls').doc(callId);
      const answerCandidates  = callDoc.collection('answerCandidates');
      pc.onicecandidate = event => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change)
          if(change.type ==='added'){
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        })
      });
    };

};



