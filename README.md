# Market Manager App

Market Manager is an application to help manage farmers' markets.

## Front End

This TypeScript/React application provides the front end for Market Manager, and works with a Java / Spring Boot back end.

## Functionality

Currently implemented functionality includes:

-   application infrastructure (database, authentication, etc.)
-   managing stallholders
    -   library of stallholder information
-   managing markets
    -   calendar view of market events

Some of the intended functionality yet to be implemented includes:

-   managing stallholders:
    -   track payment of stall fees,
    -   track attendance.
-   manage markets:
    -   automatically generate market events based on recurrence pattern,
    -   automatically generate list of expected stallholders based on typical stallholder attendance pattern,
    -   plan site maps, with automated assistance to lay out stallholders appropriately based on various characteristics.

## Design Decisions

### Language / Framework

TypeScript/React were used as I wanted to develop my skills with these commonly-used technologies.

### Identity and Access Management

Several different implementations were developed for the IAM, so that I could learn more about different techniques and options, including a custom authorization server implemented with Spring Security, and setting up a KeyCloak instance. Ultimately, as reliability and security are so important for IAM, Okta was used as an off-the-shelf solution.

# Running the app

The application as stored in this repo will not run, as it relies on the presence of a valid ".../lib/OktaConfig.ts", which is omitted as it contains secrets.
A valid OktaConfig.ts takes the format shown in OktaConfigExample.ts.

The Okta user set up for this application should provide a claim of "userType", which may be blank, and is "admin" for an admin user.

For the application to function as intended, the companion back end application must be running at localhost:8080.

(Readme last updated 03Nov2023)
