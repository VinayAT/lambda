var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var iam = new AWS.IAM({ apiVersion: '2010-05-08' });

function iAmOperation() {

    var paramsGroup = {
        GroupName: "TestGroup"
    };
    iam.createGroup(paramsGroup, function (err, data) {
        if (err) {
            console.log("Error in Creating Group, Abort!" + err + err.stack);
        }
        else {
            console.log("Group is created, Proceeding with creating user with response->" + JSON.stringify(data));
            var userParams = {
                UserName: "TestUser"
            };
            iam.createUser(userParams, function (err, data) {
                if (err) {
                    console.log("Error in Creating User, but Group was crated, Status-> Abort!" + err + err.stack);
                }
                else {
                    console.log("User is created, Proceeding with adding user to group with response->" + JSON.stringify(data));
                    var params = {
                        GroupName: "TestGroup", 
                        UserName: "TestUser"
                       };
                       iam.addUserToGroup(params, function(err, data) {
                        if (err) {
                            console.log("Error in Adding User To Group, but Group,User was creted, Status-> Abort!" + err + err.stack);
                        }
                        else {
                            console.log("User is added to group->" + JSON.stringify(data));
                        }
                       });
                }

            });

        }

    })
}
module.exports.handler = iAmOperation;
