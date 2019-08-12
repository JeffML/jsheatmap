# jsheatmap
Generates heat map data 

# API
import jsheatmap from 'jsheatmap

const headings = ["h1", "h2", "h3"]
const rows = [
  ["label1", [1, 2, 3]]
  ["label2", [2, 3, 3]]
  ["label3", [2, 1, 1]]
]


const heatmap = new jsheatmap(headings, rows)
const data = heatmap.getData();
