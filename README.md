# ByteWheelsProject


CONTENTS OF THIS FILE
---------------------
   
 * Introduction
 * Prerequisites
 * Installation
 * Configuration
 * Build and Run
 * Calling REST API's
 * Test cases
----------------------------

#################################
		1.Introduction
#################################

 ByteWheels is a car rental web application. we can book various models of cars. Broadly we categorised into four types
 1. Compact ($20 per day)
 2. Full ($30 per day)
 3. Large ($40 per day)
 4. Luxury ($50 per day)


#################################
		2.Prerequisites
#################################

1.JAVA 7 or above
2.Eclipse neon or above
3. Glassfish 4.0  or Payara-4.1.1.164 application server
4.MySQL 

#################################
		3.Installation
#################################

1. Java 7 or above references
------------------
http://www.oracle.com/technetwork/java/java-archive-downloads-javase7-521261.html

http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
--------------------

2.Eclipse neon or above
------------------
http://www.eclipse.org/downloads/packages/
http://www.eclipse.org/downloads/packages/release/Neon/3
------------------

3.  Payara-4.1.1.164  (Glassfish 4.0) application server
--------------------
https://www.payara.fish/all_downloads
--------------------

4.MySQL 
--------------------
https://www.mysql.com/downloads/
--------------------


#################################
		4.Configuration
#################################

1. Execute "bytwheels.sql" scripts in mysql
.
2.Create datasource in payara (refer ByteWheels_Setup_Version_1.0.docx)

3.Open the project in eclipse and add payara server (by installing glassfish tool in eclipse market).

references

https://stackoverflow.com/questions/25200410/how-to-configure-glassfish-server-in-eclipse-manually
https://www.packtpub.com/mapt/book/application_development/9781785285349/7/ch07lvl1sec36/configuring-the-glassfish-server-in-eclipse



4.Make sure the following libraries are there in project 
  -Glassfish  system libraries
  -JRE system libraries
  -Maven dependencies
  -Referenced libraires

#################################
		5.Build and Run
#################################

1. project right click -> run as -> maven build
2. eclipse -> menu -> project -> clean
3. project right click -> run as Server -> select payara server.

#################################
		6.Calling REST API's
#################################

Refer RESTAPI's.odt   


#################################
		6.Test cases
#################################

Refer ByteWheelsTestCases.xlsx
