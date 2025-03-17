# React JSON-Based Website

The website is designed to be modular and dynamic. The user's name and project details are stored in a JSON file, making it simple to update and maintain. This approach minimizes code changes and streamlines the process of customizing the site.



## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Updating Content](#updating-content)
- [New files](#new-files)

## Overview

This guide provides step-by-step instructions on how to create your own personalized website by copying and customizing this project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine. 
- npm (comes with Node.js) as your package manager.

### Setup

1. **Clone the Repository:**

    To do this you need to have git installed.
    ```bash
    git clone https://github.com/eirbja/eirbja.github.io.git
    ```

2. **Remove the .git Folder**

    You need to be in the folder where the files you got when cloning the repository is.
    ```bash
    rm -rf .git
    ```

3. **Create new GitHub Repository**

    1. Go to [GitHub](https://github.com/).
    2. Click the **"+"** icon in the top right and select **"New repository"**.
    3. Enter **username.github.io** as the Repository name. (🚨Remember to change `username`🚨) 
    4. Press **Create Repository**.

4. **Create git repository and add files:**

    (🚨Remember to change `username`🚨)

    ```bash
    git init
    git remote add origin https://github.com/username/username.github.io.git
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```

5. **Install Dependencies:**

    ```bash
    npm install
    ```

## Updating Content

The website content is driven by a JSON file, making it easy to update your details without touching the React code.

### Example JSON Snippet

```json
{
  "name": "John Doe",
  "projects": [
    {
      "title": "Game console",
      "description": "Very Game console",
      "image": "/sample_image.jpg",
      "imageH": 380
    },
    {
      "title": "Autonomous Drone",
      "description": "Very cool Autonomous Drone",
      "image": "N/A",
      "imageH": 300
    }
  ]
}
```

### Important Customization Notes:
- `name`: Should be changed to your name

- `projects`: A list of all the projects you want to display.

    - `title`: The name of the project. For instance

    - `description`: A brief description of the project.

    

    - `image`: The file path or URL to the project's image. Use `"image": "/sample_image.jpg"` to specify an image located in your project directory or provide a full URL for external images. If no image is available, you can use `"image": "N/A"`.

    - `imageH`: The height of the image in pixels.

Make sure to follow the JSON structure when adding or modifying.


## New Files

All new files, such as images or documents, should be added to the `public` folder. This ensures they are accessible to the website and can be referenced in the JSON file or other parts of the project.

🚨 **Important!** Your cv file has to be called my_CV.svg (and be of the svg format)

New files should have the same references as in the json example [here](#updating-content).

### Example Structure:
```
public/
├── sample_image.jpg      # Example project image
└── my_CV.svg             # Your CV file
└── favicon.ico
```


## Deploy

1. **Homepage:**

    In the package.json file, change the homapage to be ```"homepage": "https://username.github.io/"```. Where again "username" needs to be set to your github username.

2. **GitHub Pages:**
    ```bash
    npm install gh-pages
    ```

3. **NPM Deploy:**
    ```bash
    npm run deploy
    ``` 

### Check if it works

If this does not work go to the github repo on the github website. Click settings in the top bar, and then pages on the left. URL should look like this: https://github.com/username/username.github.io/settings/pages

Find: "***Branch***

Your GitHub Pages site is currently being built from the gh-pages branch."

And change from main to ```gh-pages``` and ```/Root.```