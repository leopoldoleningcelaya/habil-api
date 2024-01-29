# Habil-API
A RESTful API that gives support to a platform where professionals can publish their services and clients can see reviews of their work and contact them.

# User Authentication
This API uses a [Keycloak](https://www.keycloak.org/) instance in background as an Authentication server, which can be replaced with any other tool by writing the corresponding adapter class following the [AuthAdapter interface](https://github.com/leopoldoleningcelaya/habil-api/blob/master/src/interfaces/auth.interface.ts) and adding the it specific configuration.

# How to run the server
