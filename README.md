# Sportship
A RESTful API to handle sports memberships. The main idea is that the owners of sports centers can offer their activities so that their clients can see them and hire them.

# User Authentication
This API uses a [Keycloak](https://www.keycloak.org/) instance in background as an Authentication server, which can be replaced with any other tool by writing the corresponding adapter class following the [AuthAdapter interface](https://github.com/leopoldoleningcelaya/Sportship/blob/master/src/interfaces/user.interface.ts) and adding the it specific configuration.

# How to run the server