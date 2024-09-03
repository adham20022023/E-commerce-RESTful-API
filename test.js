function disemvowel(str) {
  return str
    .split("")
    .filter((ele) => !"aeiouAEIOU".includes(ele))
    .join("");
}
console.log(disemvowel("adham ashraf ebrahim"));
