
![wagwise-header](https://github.com/user-attachments/assets/e4ce0f7b-504b-41d1-bda9-2923cc5d477e)


## 🐕 Introduction
Welcome to the Wag Wise CMS, a user-friendly application providing a GUI for admins to create, manage and moderate content on [Wag Wise](https://wagwise-blog.vercel.app/).

### Visit the site!
[https://wagwise-cms.vercel.app/](https://wagwise-cms.vercel.app/)
## ⚙️ Backend
The source code for the api can be found here: [Wag Wise API](https://github.com/CiaranO-C/WagWise)
## 😃 User Inteface
The source code for the public/user facing front-end can be found here: [Wag Wise Blog](https://github.com/CiaranO-C/wagwise-blog)
## 📖 Table of Contents
- [Installation](#%EF%B8%8F-installation)
- [Features](#-features)
    - [Articles](#article-features)
    - [Tags](#tag-features)
    - [Comments](#comment-features) 
    - [Auth](#auth)
- [Credits](#%EF%B8%8F-credits)     
## ⬇️ Installation
To clone and run locally you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/package-manager)(which comes with npm) installed.
enter the following in your command line:
```
# Clone this repository
$ git clone https://github.com/CiaranO-C/wagwise-cms

# Go into the repository
$ cd wagwise-cms

# Install dependencies
$ npm install
```

### Usage  
To start the app in Vite dev mode run:  
`npm run dev`  

### Environment variables  
create the following two Vite env files  
`.env.local`  
`.env.production`  

each file should contain the following variable:   
```
# replace this with your own production/local url
VITE_API_URL=https://wagwise.com
```
## 🔎 Features
### Article Features
#### Search for an article
Want to find something quickly? Search for the article you want in the search bar to view a paginated list of articles in order of relevance!

https://github.com/user-attachments/assets/ec24982b-27c8-475d-af30-3b3075cba064

#### Create a new article
Users can access the new article feature from either the sidebar or from the card directly at the top of the home screen. Met by the TinyMCE Rich text editor users can easily write and style new content, including a section which facilitates both the creation and application of tags onto each article.

https://github.com/user-attachments/assets/421980c1-36a1-49b9-998d-c45083eaeeba  

Upon saving your new article, React router will take you to the Edit article page, as your content is now stored in the database with its own Article ID.  

#### Navigate to new article
New articles are set to unpublished by default, we can locate the newly created article via navigating to the unpublished section within the Articles page, or from simply selecting the 'unpublished' option on the Home page articles card.

https://github.com/user-attachments/assets/d96a17c6-2645-4a96-99e4-9bbe266e6ccf

#### Edit article
Once you have opened the article you wish to edit, it's as simple as it was to create an article. Make any any changes you wish and hit the save button before navigating elsewhere!  

https://github.com/user-attachments/assets/8df7ddb6-8c15-4cb4-b528-21ff9d21c4dc

#### Delete article
Not a fan of your article.. or just want a clean slate? Deleting an article is quick and easy, just click the delete button located in the top right corner of the Edit Article page! Upon deletion, you will be taken to the New Article page automatically.

https://github.com/user-attachments/assets/21357cea-995f-4695-a431-b4bc335e8abd

#### Preview article
If at any time you wish to see a cleanly formatted version of your article outside the text editor, simply click the preview buton situated in the bottom right of the Edit Article page! If you wish to return back to the 'Edit' view click the edit button at the top right of the page, where the delete button previously was.

https://github.com/user-attachments/assets/cd76c4e3-8031-4221-b8d9-3560e72df49e

### Tag Features 








### Comment Features
Unfortunately comments aren't always nice! Whether offensive content is left on your site, or spam and scams, the comment flagging system simplifies moderating unwanted messages. Offensive content is automatically flagged and sent to the “Review” section on the Home page, while less obvious or nuanced content can be reviewed individually on the Comments page, with the ability to flag multiple comments and delete them all at the click of a button.. or individually!

https://github.com/user-attachments/assets/2783a800-9b78-42fc-a931-07323b86c333

### Auth
Through a protected component layer and continuous server checks, users are automatically redirected to the login page when their access token has expired or becomes invalid, and no refresh token is available. This system ensures only authenticated users can access the site, prompting them to re-login when necessary to regain access.

## 🖇️ Credits
This software uses the following dependencies:
- [React](https://react.dev)
- [ESLint](https://eslint.org)
- [Vite](https://vite.dev)
- [TinyMCE](https://www.tiny.cloud/)
- [dompurify](https://github.com/cure53/DOMPurify)
- [HTML React Parser](https://github.com/remarkablemark/html-react-parser#readme)
- [JWT Decode](https://github.com/auth0/jwt-decode#readme)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router](https://reactrouter.com/en/main)
- [React Spinners](https://www.davidhu.io/react-spinners/)
- [Styled Components](https://styled-components.com)
