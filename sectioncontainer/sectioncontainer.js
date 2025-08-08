export default async function decorate(block) {
  console.log('Decorating block:', block);
  block.classList.add('teste');
}
