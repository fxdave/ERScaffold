# Method of ordering elements

It doesn't needed to calculate the exact position of the element. It can use iterative solution. Every iteration would be a frame so we can have a nice and smooth animation with resulting a ordered elements on the canvas.

First of all let fix some parameters:
 o = Optimal distance between the elements to achive
 s = Maximum Step distance 

## Calculating the moving direction 

Let a list of (point-like) elements: `[A,B,C,D,E]`.
If we are on the element `A`, it would calculate the sum: `BA+CA+DA+EA`.
The result is the moving direction.
In order to set the `o`, those vectors that has the length bigger then the `o`, musn't calculated in the sum, or with negative value (it depends on the needs).

## Calculating the distance of the step

We can get the distance from the direction vector, but probably it will be too big. 
We also can calculate an avarage of the vectors, wich is much more friendly. We can use it as a direction, too.

### Easing

There are some way to implement it.
We can use a constant (like step 0.1px while not optimal). It is easy, but the animation would be linear that is not a good looking solution.

We also can use line function. We want the near elements to move away faster than the distant elements. 
So we can use something like f(d) = (-s/o)*d+s
This results an ease-out like animation.