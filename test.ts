const categories = [{ id: 0, name: "name" }];

console.log(categories.find((cat) => cat.id === 1)?.name ?? "+++");
