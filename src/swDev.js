function swDev() {
  let toDoSW = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(toDoSW).then((resp) => {});
}

export default swDev;
