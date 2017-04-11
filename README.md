# CMPE281Hackathon
Created a Demo Portal 
https://drive.google.com/open?id=0BxEKNvS0iqmjdDFxbm1iSnJYNVU

Created Portal pages:
1. Starbucks homepage
2. Login-Authentication page
3. Registration page
4. Contact Info Page
https://drive.google.com/open?id=0BxEKNvS0iqmjekxhQ2c0TW1vTms

No SQL Databases study
https://www.thoughtworks.com/insights/blog/nosql-databases-overview

POC on Setting up Cassandra Cluster
http://ealfonso.com/setting-up-a-cassandra-cluster-on-awsubuntu14-04/

Backend API in Nodejs using express, mongodb and bodyparser
setup steps:

MongoDB Setup for 3 clusters:
Reference:https://gist.github.com/leommoore/309de7c0042ed697ee84

Step1:
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

Step2:
Stop the mongod server for a while.
using:
sudo service mongod stop

Step3:
##Modify the hosts on each Server Modify the hosts file on each server. Obviously on mongo1 the 127.0.0.1 will point at localhost mongo1.example.com
ip's below are ip's of AWS instances
sudo nano /etc/hosts

127.0.0.1           localhost mongo0.example.com
52.51.12.62         mongo0.example.com
52.18.54.237        mongo1.example.com
52.40.234.42        mongo2.example.com

Step 4:
a. ##Modify the hostname on each Server To make it easier, it is best to modify the hostname to make the servers easier to reference. First set the current hostname.

sudo hostname mongo0.example.com

b. Then update the hostname file to set the server name permanently.

sudo nano /etc/hostname

c. Set the hostname in the file to:

mongo0.example.com

Step 5: 
##Modify the Mongo Configuration You need to modify the mongo configuration /etc/mongod.conf to first remove or comment out the bind_ip. This will tell mongo to listen on all interfaces.
------------------------------------------------------------------------------------------------------------------------------

# mongod.conf                                                               

# for documentation of all options, see:                                    
#   http://docs.mongodb.org/manual/reference/configuration-options/         
  
# Where and how to store data.                                              
storage:                                                                    
  dbPath: /var/lib/mongodb                                                  
  journal:                                                                  
    enabled: true                                                           
#  engine:                                                                  
#  mmapv1:                                                                  
#  wiredTiger:                                                              
 
# where to write logging data.                                              
systemLog:                                                                  
  destination: file                                                         
  logAppend: true                                                           
  path: /var/log/mongodb/mongod.log                                         
 
# network interfaces                                                        
net:                   
  #bindIp: 127.0.0.1 - Important to comment this line
  port: 27017                                                               

#processManagement:                                                         
   
#security:                                                                  
   
#operationProfiling:                                                        
  
#replication:                                                               
replication:                                                                
   oplogSizeMB: 1                                                           
   replSetName: rs0                                                         

#sharding:                                                                  

## Enterprise-Only Options:                                                 

#auditLog:                                                                  
  
#snmp:   

-------------------------------------------------------------------------------------------------------------------------------

Step6: 
##Initiate the Replication Set Start the mongo shell on mongo0:
mongo

Add the first server which will become the Primary to the replica set using:

rs.initiate()

This will create the initial replica set configuration. You can then add in the second server which will become the Secondary.

rs.add("mongo1.example.com:27017")

You can then add in the third server which will be the Arbitrator. Note to make this an Arbitrator you need to specify true when you add it to the set.

rs.add("mongo2.example.com:27017",true)


#Note
when you are trying to run db.foo.find() on the Secondary. This is because the Secondary (ie the Slave) is not setup to perform reads. This can be enabled using the following command:

db.setSlaveOk()









