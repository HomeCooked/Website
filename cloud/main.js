// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});
var InviteReq = Parse.Object.extend("InviteRequest");
Parse.Cloud.beforeSave("InviteRequest", function (request, response) {
  if (!request.object.get("name") || !request.object.get("email") || !request.object.get("zipcode")) {
    response.error('Must give name, email and zipcode to get an invite.');
  } else {
    var query = new Parse.Query(InviteReq);
    query.equalTo("email", request.object.get("email"));
    //search for email
    query.first({
      success: function (object) {
        if (object) {
          response.error(
            JSON.stringify({
              status: 200,
              message: 'email already invited'
            }));
          //TODO, shall we save the new zipcode, name and phone?
        } else {
          response.success();
        }
      },
      error: function (error) {
        response.success();
      }
    });
  }
});
