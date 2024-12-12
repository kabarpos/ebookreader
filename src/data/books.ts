import { Book } from '../types';
import React from 'react';

export const books: Book[] = [
  {
    id: 1,
    title: "Modern Web Development with React",
    author: "Sarah Johnson",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=400",
    description: "A comprehensive guide to building modern web applications using React and its ecosystem.",
    purchased: true,
    previewPages: 10,
    chapters: [
      {
        id: "chapter-1",
        title: "Getting Started with React",
        subchapters: [
          {
            id: "1-1",
            title: "Introduction to React",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Introduction to React'),
              React.createElement('p', { key: 'intro' }, 
                'React is a JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most popular front-end libraries in the world.'
              ),
              React.createElement('h2', { key: 'concepts' }, 'Key Concepts'),
              React.createElement('ul', { key: 'list' }, [
                React.createElement('li', { key: 'c1' }, 'Component-Based Architecture'),
                React.createElement('li', { key: 'c2' }, 'Virtual DOM'),
                React.createElement('li', { key: 'c3' }, 'JSX Syntax'),
                React.createElement('li', { key: 'c4' }, 'Unidirectional Data Flow')
              ])
            ])
          },
          {
            id: "1-2",
            title: "Setting Up Your Development Environment",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Setting Up Your Development Environment'),
              React.createElement('p', { key: 'intro' }, 
                'Before we start building React applications, we need to set up our development environment.'
              ),
              React.createElement('h2', { key: 'tools' }, 'Required Tools'),
              React.createElement('ul', { key: 'list' }, [
                React.createElement('li', { key: 't1' }, 'Node.js and npm'),
                React.createElement('li', { key: 't2' }, 'Code Editor (VS Code recommended)'),
                React.createElement('li', { key: 't3' }, 'Git for version control')
              ])
            ])
          },
          {
            id: "1-3",
            title: "Creating Your First React App",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Creating Your First React App'),
              React.createElement('p', { key: 'intro' }, 
                'Let\'s create our first React application using Create React App.'
              ),
              React.createElement('pre', { key: 'code' }, 
                'npx create-react-app my-app\ncd my-app\nnpm start'
              )
            ])
          }
        ]
      },
      {
        id: "chapter-2",
        title: "React Fundamentals",
        subchapters: [
          {
            id: "2-1",
            title: "Components and Props",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Components and Props'),
              React.createElement('p', { key: 'intro' }, 
                'Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.'
              ),
              React.createElement('h2', { key: 'example' }, 'Example Component'),
              React.createElement('pre', { key: 'code' }, 
                'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}'
              )
            ])
          },
          {
            id: "2-2",
            title: "State and Lifecycle",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'State and Lifecycle'),
              React.createElement('p', { key: 'intro' }, 
                'State allows React components to change their output over time in response to user actions, network responses, and anything else.'
              ),
              React.createElement('pre', { key: 'code' }, 
                'const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n});'
              )
            ])
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Full Stack Development with Node.js",
    author: "Michael Chen",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=300&h=400",
    description: "Learn to build complete web applications with Node.js, Express, and MongoDB.",
    purchased: true,
    previewPages: 10,
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to Node.js",
        subchapters: [
          {
            id: "1-1",
            title: "What is Node.js?",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'What is Node.js?'),
              React.createElement('p', { key: 'intro' }, 
                'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows you to run JavaScript on the server side.'
              ),
              React.createElement('h2', { key: 'features' }, 'Key Features'),
              React.createElement('ul', { key: 'list' }, [
                React.createElement('li', { key: 'f1' }, 'Event-driven, non-blocking I/O'),
                React.createElement('li', { key: 'f2' }, 'Package management with npm'),
                React.createElement('li', { key: 'f3' }, 'Large ecosystem of libraries')
              ])
            ])
          },
          {
            id: "1-2",
            title: "Setting Up Node.js",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Setting Up Node.js'),
              React.createElement('p', { key: 'intro' }, 
                'Learn how to install and configure Node.js on your system.'
              ),
              React.createElement('pre', { key: 'code' }, 
                'node --version\nnpm --version'
              )
            ])
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "TypeScript in Practice",
    author: "Emma Wilson",
    coverImage: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=300&h=400",
    description: "Master TypeScript and build type-safe applications.",
    purchased: true,
    previewPages: 10,
    chapters: [
      {
        id: "chapter-1",
        title: "TypeScript Fundamentals",
        subchapters: [
          {
            id: "1-1",
            title: "Why TypeScript?",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Why TypeScript?'),
              React.createElement('p', { key: 'intro' }, 
                'TypeScript adds optional static types to JavaScript. It provides better tooling, scalability, and maintainability for large applications.'
              ),
              React.createElement('h2', { key: 'benefits' }, 'Benefits'),
              React.createElement('ul', { key: 'list' }, [
                React.createElement('li', { key: 'b1' }, 'Static typing'),
                React.createElement('li', { key: 'b2' }, 'Object-oriented features'),
                React.createElement('li', { key: 'b3' }, 'IDE support'),
                React.createElement('li', { key: 'b4' }, 'ECMAScript compatibility')
              ])
            ])
          },
          {
            id: "1-2",
            title: "Basic Types",
            content: React.createElement('div', null, [
              React.createElement('h1', { key: 'title' }, 'Basic Types in TypeScript'),
              React.createElement('p', { key: 'intro' }, 
                'TypeScript supports several types to help you write type-safe code.'
              ),
              React.createElement('pre', { key: 'code' }, 
                'let isDone: boolean = false;\nlet decimal: number = 6;\nlet color: string = "blue";'
              )
            ])
          }
        ]
      }
    ]
  }
];