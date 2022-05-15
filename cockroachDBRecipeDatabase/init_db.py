import os
import logging
import random
from math import floor
from psycopg2.pool import SimpleConnectionPool

logger = logging.getLogger()
logger.setLevel(logging.INFO)

pool = None


def AddRecipeVideoTutorials(link, n):
    conn = p.getconn()
    with conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS videotutorials ")
        conn.commit()
        while n > 0:
            
            cur.execute("UPSERT INTO VIDEO LINKS TABLE (DEFAULT, %s)", [
                        link])
            logger.info(
                f"Created new video link section with link:  {link}.")
            n -= 1
        logger.debug(f"AddRecipeVideoTutorials(): status message: {cur.statusmessage}")
        conn.commit()


def lambda_handler(event, context):
    global pool
    if not pool:
        pool = SimpleConnectionPool(0, 1, dsn=os.environ['postgresql://aditya:E_96sxFnQeXCLBRdcYWNEQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster=karmic-kakapo-1943'])

    AddRecipeVideoTutorials(pool, 5)

    logger.info("Database initialized.")

    return
