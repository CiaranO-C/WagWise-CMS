
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
- [Credits](#-credits)     
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
Not a fan of your article.. or just want a clean slate? Deleting an article is quick and easy, just click the delete button located in the top right corner of the Edit Article page!

https://github.com/user-attachments/assets/21357cea-995f-4695-a431-b4bc335e8abd




#### Preview article



### Tag Features 

https://github.com/user-attachments/assets/93d002f1-a195-4dd9-80d2-e8561526289a



### Comment Features



### Auth

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
