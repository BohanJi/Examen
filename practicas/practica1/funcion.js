function setGray()
{
let color="white"; // value if not checked
if (document.getElementById("back-gray").checked)
color="gray"; // value if checked
// get element with desired id
const e = document.getElementById("background");
// set the background color to that element
e.style["background-color"] = color;
}