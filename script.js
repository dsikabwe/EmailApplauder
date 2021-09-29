// We're checking for mutations of the DOM——specifcally, the
// element that says "Sending...". This code will break if a dev
// on the Gmail team so much as sneezes.

window.onload = function () {
	const vh = document.querySelectorAll('div.vh')

	console.log(vh.length)
	const targetNode = vh[0] // div with class vh
	console.log(targetNode)

	const observerOptions = {
		childList: true,
		attributes: true,
		// Omit (or set to false) to observe only changes to the parent node
		subtree: false
	}

	const observer = new MutationObserver(callback)
	observer.observe(targetNode, observerOptions)
}

function callback(mutationList, observer) {
    mutationList.forEach( (mutation) => {
		if (mutation.type === 'childList') {
			for (const node of mutation.addedNodes.values()) {
				if (node.nodeType === Node.TEXT_NODE && node.textContent === "Sending...") {
					console.log(node)
					const audio = new Audio(chrome.runtime.getURL("applause.mp3"))
					audio.play()
				}
			}
		}
    });
}