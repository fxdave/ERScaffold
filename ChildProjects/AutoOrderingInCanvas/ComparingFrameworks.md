# Comparing Canvas frameworks

For the modeller I should use different components for each type of elements.

# EaselJS
Babel.js is not oficially supported, we must wrap the project with it later in order to use classes in javascript.
It has a great support for tweener, so we can achive smooth animations. 
Easy to separate the code into components.
Easy to add events to canvas elements.
Modern solution.
LIGTHWEIGHT!

# Konva.js
It supports React.js wich is a very good frontend framework developed by facebook.
With react we can easily achive the adventages of ES6 (Babel.js), and component based structure.
There is a lot of demos out of the internet.
It's API is chatty.
On the other hand, it could be easier. React's DOM render aproach is not well suited in my problem. Anyway, React is not a requirement of Konva.
There is a zooming and a scrolling example.

# Decision
So konva is good but seems like legacy solution for canvas drawing. I go with the lightweight EaselJS.
