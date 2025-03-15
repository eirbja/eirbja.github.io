# React JSON-Based Website

This project is a website built using React that leverages a JSON file for easy content updates.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Updating Content](#updating-content)
- [New files](#new-files)

## Overview

The website is designed to be modular and dynamic. The user's name and project details are stored in a JSON file, making it simple to update and maintain. This approach minimizes code changes and streamlines the process of customizing the site.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine. 
- npm (comes with Node.js) as your package manager.

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/eirbja/eirbja.github.io.git
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Run the Development Server:**

```bash
npm start
```

## Updating Content

The website content is driven by a JSON file, making it easy to update your details without touching the React code.

### Example JSON Snippet

```bash
{
  "name": "John Doe",
  "projects": [
    {
      "title": "Game console",
      "description": "Verry Game console",
      "image": "/sample_image.jpg",
      "imageH": 380
    },
    {
      "title": "Autonomous Drone",
      "description": "Verry cool Autonomous Drone",
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

### Example Structure:
```
public/
├── sample_image.jpg      # Example project image
├── my_CV.svg             # Your CV file
└── index.html
```
When adding new files, ensure they are properly referenced in the JSON file to display them correctly on the website. 
#### important 
Your cv file has to be called my_CV.svg (and be of the svg format)

