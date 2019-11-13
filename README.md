# LTI 1.3 Advantage Demo Tool
This code consists an example tool that utilize the library LTI 1.3 PHP library.

# Running The Example Code

## Setup
The example is all written in PHP, and it also contains a docker compose file for easy setup if you have docker installed.

### Registration and Deployment
First thing you will need is to configure your registration and deployment in the example code's fake registrations database.

This can be found in the example tool's code at `db/configs/local.json`.
To configure your registration add a JSON object into a `db/configs/local.json` file in the following format. You can find an example of a registered tool in the `db/configs/example.json` file.

```javascript
{
    "<issuer>" : { // This will usually look something like 'http://example.com'
        "client_id" : "<client_id>", // This is the id received in the 'aud' during a launch
        "auth_login_url" : "<auth_login_url>", // The platform's OIDC login endpoint
        "auth_token_url" : "<auth_token_url>", // The platform's service authorization endpoint
        "key_set_url" : "<key_set_url>", // The platform's JWKS endpoint
        "private_key_file" : "<path_to_private_key>", // Relative path to the tool's private key
        "deployment" : [
            "<deployment_id>" // The deployment_id passed by the platform during launch
        ]
    }
}
```

To register your tool inside a platform, the platform will need two URLs

```
OIDC Login URL: http://localhost:9001/login.php
LTI Launch URL: http://localhost:9001/game.php
```

These URLs may vary if you do not use docker-compose to run the tool and instead run it locally.

### Running in Docker
To run in docker you will need both `docker` and `docker-compose`

To get the examples up and running in docker simply run:
```
docker-compose up --build
```

You're now free to launch in and use the tool.

# Example Platform
Due to popular demand, an example platform has been added to show an example of launching into the example game.

The registration and deployment between the example platform and tool is already set up, so no configuration is needed.

To view the example platform, go to http://localhost:9001/platform

**Note:** The platform is for example purposes only and not a full platform library.

# Contributing
If you have improvements, suggestions or bug fixes, feel free to make a pull request or issue and someone will take a look at it.

You do not need to be an IMS Member to use or contribute to this library, however it is recommended for better access to support resources and certification.

This library was initially created by @MartinLenord from Turnitin to help prove out the LTI 1.3 specification and accelerate tool development.

**Note:** This library is for IMS LTI 1.3 based specifications only. Requests to include custom, off-spec or vendor-specific changes will be declined.

## Don't like PHP?
If you don't like PHP and have a favorite language that you would like to make a library for, we'd love to hear about it!
