export default async function decorate(block) {
    console.log("decorator", block.classList)
    block.classList.add('teste2');
}
