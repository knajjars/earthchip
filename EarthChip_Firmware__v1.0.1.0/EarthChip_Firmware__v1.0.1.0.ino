//MAGUI DEC 2018

#include <Arduino.h>


#define DHTPIN D1
#define DHTTYPE DHT22
#define USE_SERIAL Serial
#define SOILPIN A0

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"
#include "Adafruit_Sensor.h"




ESP8266WiFiMulti WiFiMulti;

void setup() {
  USE_SERIAL.begin(115200);
  pinMode(D0, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(SOILPIN,INPUT);
  pinMode(D1,INPUT);
  DHT dht(DHTPIN, DHTTYPE);
  Serial.println(dht.readHumidity());
  Serial.println(dht.readTemperature());

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    Serial.println(analogRead(SOILPIN));
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
//  WiFiMulti.addAP("Tom's iPhone (3)", "failsafe25-five"); //ADD WIFI CREDENTIALS
  WiFiMulti.addAP("Vodafone-643D", "U6ApXkbeT4pTvV7j"); //ADD WIFI CREDENTIALS
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    HTTPClient http;
    digitalWrite(D4,LOW);
    USE_SERIAL.print("[HTTP] begin...\n");
    // configure traged server and url
    //http.begin("https://192.168.1.12/test.html", "7a 9c f4 db 40 d3 62 5a 6e 21 bc 5c cc 66 c8 3e a1 45 59 38"); //HTTPS
    String url = "http://46.101.242.50/api/data-earthchip?macAddress=" ;
    url.concat(WiFi.macAddress());
    url.concat("&environmentHumidity=");
url.concat(dht.readHumidity());
url.concat("&environmentTemp=");
url.concat(dht.readTemperature());
url.concat("&soilMoisture=");
url.concat("66");

    Serial.println(url);
    
    http.begin(url); //HTTP
    
    USE_SERIAL.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        USE_SERIAL.println(payload);
      }
    } else {
      USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }
  digitalWrite(D4,HIGH);
  delay(10000);
}
