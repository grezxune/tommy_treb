---
layout: post
title:  "Learning React"
date:   2018-03-8
comments: true
project: false
---

It's been a while since I've gone through the course now, but I've been using React for quite a few months at this point. I started learning react because of a recommendation from a friend, and let me tell ya, it's freakin' cool! The course that I took to learn React can be found [here](https://www.udemy.com/react-2nd-edition/learn/v4/overview) on Udemy.

I'm a huge fan of Udemy for a few reasons:

1.  The courses are almost always on sale (don't ever pay full price for one).
2.  The course content is often very all-inclusive and teaches a full concept or skill.
3.  You get to keep the course forever!
4.  You get a certificate of completion for finishing a course, which can become a point on a resume, etc.
5.  Often times you are building apps throughout the course which in my case can be hosted as finished products on the internet! If you're not doing web technologies, obviously this may not apply, but they're still very hands on most of the time.

Alright, so if I haven't convinced you Udemy is a great resource yet, I don't think I can! Let's move on.

I had not been exposed to a component-style front end until this and it was a totally new concept for me. It felt weird at first, but it's so easy to think in the component mindset once you start to see how it works, so let's get into it!

# The First App
The first project in this course is called [Indecision](http://indecision.tommytreb.com). This app is a simple concept. Essentially you as a user create a list of items, and then click a button. The app will then randomly choose one of your list items and display it; the idea is you enter in things you'd like to do but cannot decide and the app will help you out. It's a great demo of React and how it works. It contains several components, both functional and class based.

### The Render Method
Every React component needs to render something. The HTML type syntax that you will see in React is called JSX (Javascript XML), which is what gets rendered. The older versions of React do not require the use of JSX, rather it might call a method called `React.createElement` which creates DOM elements functionally. JSX reads much more naturally and is easier to read and maintain.

Any given React component can only render ONE parent element. A lot of times this means a React component will return a parent div with an array of children inside of it.

A functional component needs to return JSX from itself (the function), and class based components are required to contain a `render` method that also returns JSX.

### Functional React Component
One of the main differences between functional and class React components is the ability to hold state. Functional components can only use props that are passed to it from the parent and cannot modify these values.
{% highlight JavaScript linenos %}
const Header = (props) => (
    <div className="header">
        <div className="container">
            <h1 className="header__title">{props.title}</h1>
            <h2 className="header__subtitle">{props.subtitle}</h2>
        </div>
    </div>
);
{% endhighlight %}

If you need the ability to have your component update some values and persist or display them, you'd want to take a look at class based components.

### Class React Component
Here we're able to see that the class has a state variable associated with it which is an object. This object should never be manipulated manually, rather using the `this.setState()` method provided by React. Using `this.setState()` will automatically rerender the component and update all values on the screen. If you're displaying anything or deriving anything from state, it will show the updated version once this rerender occurs.

{% highlight JavaScript linenos %}
export default class AddOption extends React.Component {
    state = {
        error: undefined
    };

    handleAddOption = (e) => {
        e.preventDefault();

        const targetObject = e.target.elements.option;

        const option = targetObject.value.trim();

        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        targetObject.value = '';
    };

    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form
                    className="add-option"
                    onSubmit={this.handleAddOption}>
                    <input
                        type="text"
                        name="option"
                        className="add-option__input"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}
{% endhighlight %}

In this particular example, the `error` attribute from state is able to be updated by this component, and a paragraph tag will be conditionally rendered depending on the "state" of the class's state.

# Putting the Building Blocks Together
Once these components are developed, they can be reused any number of times throughout your project! This is one of the great features of a component based library.

Generally you've got a single entrance point into your app, and from there you start to compose these components to create your view(s). The file that does this in the Indecision app is very succinct and clean.

### App Entry Point
{% highlight JavaScript linenos %}
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/indecision-app';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(
    <IndecisionApp />,
    document.getElementById('app')
)
{% endhighlight %}

This component renders a React component named IndecisionApp which is imported from a local file. This custom React component is rendered inside of the DOM element with the id of 'app'. You can see here that this is done by passing the React element to render, and the element to render it in to the `ReactDOM.render` method. This is something that comes with the `'react-dom'` package that is required to render components using React. There's some things to keep in mind when dealing with custom React components:

1. They're are always capitalized elements following the camelcase naming convention, whereas html elements are lowercase and normally only one word. The project will not display the component if you use a lowercase component name.
2. You need to import them, or define them in the same file. I can't imagine there's too many cases when you'd want to do the latter though, as it creates a much more maintainable codebase with them being separated.
3. You do not need to self-close the component's tag. You can pass children to them in between the opening and closing tags. The elements passed to the component in this fashion are accessible via the `props.children` property.

So this renders an IndecisionApp element, what the heck is that?

### The \<IndecisionApp /> Component
This component has quite a bit of code for handling actions, so I will omit some lines here.

{% highlight JavaScript linenos %}
import React from 'react';
import AddOption from './add-option';
import Option from './option';
import Options from './options';
import Action from './action';
import Header from './header';
import OptionModal from './option-modal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    // ... methods omitted

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            // Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length != this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('component will unmount');
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick} />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption} />
                </div>
            </div>
        );
    }
}
{% endhighlight %}

### Why Is There Omitted Code?
The missing code here is event handler code, specifically `handlePick`, `handleDeleteOptions`, `handleDeleteOption`, `handleAddOption`, and `handleClearSelectedOutput`.

These methods live here because I'm not using any pattern for state management besides out of the box functionality from React. There are other ways to handle this such as Redux or GraphQL but that's out of the scope for this post.

Essentially, if one of these other patterns were followed/implemented these methods could live in the components that use them, and the state would be shared throughout the app. This alleviates the need for a parent component like this to house the state and act as a controller for it.

### What Are Those Other Methods?
The three methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` are React lifecycle methods. These are not required, and in fact the `componentWillUnmount` method could just be removed from this file as it clearly does nothing useful. It was part of the React course to demonstrate when that method is called in the lifecycle of a component.

The [React documentation](https://reactjs.org/docs/react-component.html) has really great explanations of each of these methods and when to or not to use them. The lifecycle method that I use the most is `componentDidMount`. This is where AJAX requests can be fired off from to gather data for a component.

# The Next project
The final project in the React course introduces some new concepts. Namely it introduces Redux (which I mentioned earlier), and it also uses Firebase to store data and authenticate users. It's pretty cool that you get a finished app out of this course that utilizes these technologies!

The app is called [Expensify](http://expensify.tommytreb.com) and is absolutely a real world usable app when you're done. It allows a user to log in and enter expenses and some other information. A user can filter or search their expenses and see how many there are and the total. This is a very extensible app that could use some added features after the course is done guiding you through the basics. Some graphs could easily be added to show visualization of a user's data, etc.

I will consider creating a second part to this post about the Expensify app, as this one is getting a bit lengthy. I can get into what exactly Redux does in that post as well, so keep an eye out for that blog!

# Conclusion
The amount of value gained from a simple $10-$20 purchase on Udemy is unmatched. You learn so many valuable and real world skills, and you can revisit them at any time for reference. I have enjoyed taking many Udemy courses and I'm sure I'll continue this trend.

I hope this was useful and/or interesting! If it was I'd love to hear from you in the comments below.