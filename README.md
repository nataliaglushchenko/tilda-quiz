## Tilda Quiz Frontend application

To run the application use the command *npm start*.
To run test examples for the dashboard and quiz pages use the command *npm test*.

### Open questions

- **Data model:** 

Question: If you wanted to persist user answers in the database how would you do so? ****Do you see any other points that could be improved in our data model? If yes, what changes would you make?

*My answer:* For collecting user answers in database I would send the request each time the user selects an option. I would store each selected option along with the question id, and calculate the total score only when it is requested (on the dashboard page).

- **Infrastructure:** 

Question: Please describe how would you deploy your application and which services you would use. Please also describe which factors you would consider for your decision, like scalability, security, etc.

*My answer:* For production I would use AWS services such as S3, Lambdas, CloudFront for CDN, or services of another cloud provider. These services are providing fast and effective solutions. As the traffic on the application grows, the resources of the AWS can be scaled fastly.

- **Backend:** 

Question: For this exercise, we used Hasura engine as a GraphQL Server generator. Imagine that you were to develop this Quiz in the real world. How would you develop your backend? Please describe which tools and what your application architecture would look like. ****

*My answer:* For backend I would use node.js environment to run an express GraphQL server. Or depending on the requirements it's possible to use AWS AppSync service to develop GraphQL APIs or other solutions.
