# Massey Hacks Cook Interactively (Cookit)

Cookit is a 1-to-1 video chat feature with WebRTC, Firestore, and JavaScript. 
"_Providing for our customers to build of kit of recipes for university students. Connect with others to learn, cook, and exchange knowledge for the sustainability during university. Many students become obese and are forced to eat unhealthy foods without having any experience in cooking. We can change that._" - Derek & Aditya 

## Installation & Dependencies 
- Download node on website 
- Install Firebase
```
npm install firebase

```
- Install Sendgrid
```
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env

npm install --save sendgrid
```
## Usage
- Update the firebase project config in the main.js file. 
- Update the Sendgrid Twilio Single Sender ID and API Key
```
git clone <this-repo>
npm install

npm run dev
```

## Authors
- Aditya Bilawar
- Derek Sheen
