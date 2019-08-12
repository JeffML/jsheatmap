# sternomap

A simple heatmap implementation

references:
http://www.andrewnoske.com/wiki/Code_-_heatmaps_and_color_gradients
https://codepen.io/bryceyork/pen/mtqAl


# concrete ideas
## masters/openings
* list masters in <th>
* list openings in rows
* read/parse pgn file (from some source), looking for, say,  world champions. Note opening (both description and ECO)
  * if opening already noted, increment counter

## master/first move frequency over time
## large project:
* given FEN, levenstein distance against FENs (PGN => FEN generator?)
  * l-distance1: piece position with weights
  * l-distance2: square control

API
  * input: headings: string[], rows: Array<[string, number[]
  * output: {headings, rows: [{name, {values,  colors: []}] }
  
React: table representation of output

# thinking out loud

think about population head maps: 
  for each location, display pop as gradient

inputs:
  locations: [coord1, coord2, ...]
  populations: [pop1, pop2, ...] 

the #locations must match the #populations

variation: heat map of fast food preferences
  locations: ...
  fastFoodPref: {burgers: [x], pizza: [y]}

you can only do burgers or pizza, not both
x, y elements must have same length as location

variation: heat map of fast food prefs by population density (irr. of location)
  population: ...
  fastFoodPref: {burgers: [x], pizza: [y]}


so, to start with...
variation: heatmap of product color preferences
variation: heatmap of product reorders
variation: heatmap of product order quantity
variation: heatmap of product order amount
variation: heatmap of product order quantity per customer
variation: heatmap of product order amount per customer

others...
heatmap of order quantity by account age
heatmap of reorders by account age
