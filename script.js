// We're checking for mutations of the DOM——specifcally, the
// element that says "Sending...".

window.onload = function () {
	const vh = document.querySelectorAll('div.vh')
	const targetNode = vh[0] // div with class vh

	const observerOptions = {
		childList: true,
		attributes: true,
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
					const audio = new Audio(chrome.runtime.getURL("applause.mp3"))
					audio.play()
				}
			}
		}
    });
}