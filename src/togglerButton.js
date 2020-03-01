scriptElement = document.createElement('script')
scriptElement.append(`
(async () => {
    async function findSectionToAddButton() {
        return new Promise((resolve, reject) => {
            let intervalCounter = 0;
            let intervalLimit = 20;

            let intervalHandler = setInterval(() => {
                if (intervalCounter >= intervalLimit) {
                    clearInterval(intervalHandler);

                    reject();
                }

                intervalCounter++;

                let section = document.querySelector('#mainContentUiView > ui-view > ui-view > ui-view > resources > div > resources-tree > div > div.tree-nav-header')
                if (!section) return;

                resolve(section)
            }, 500);
        })
    }

    async function findRenderCtrls() {
        let resourceTreeRenderers = document.querySelectorAll('resources-tree-renderer resources-tree-renderer')
        let rendererCtrls = [];

        for (let c = 0, size = resourceTreeRenderers.length; c < size; c++) {
            let rendererCtrl = angular.element(resourceTreeRenderers[c]).scope().$$childHead.resourcesTreeRendererCtrl;
            rendererCtrls.push(rendererCtrl)
        }

        return rendererCtrls;
    }

    async function createTogglerButton(onclick) {
        let toggleButton = document.createElement('button')
        toggleButton.setAttribute('id', 'toggleButton')
        toggleButton.setAttribute('class', 'btn')
        toggleButton.setAttribute('type', 'button')
        toggleButton.setAttribute('style', 'margin-bottom: 5px;')
        toggleButton.append('Toggle')
        toggleButton.onclick = onclick;

        return toggleButton;
    }

    async function addButton() {
        // Check if button already exists
        let buttonExists = document.querySelector('#toggleButton');
        console.log("button exists?:", buttonExists)
        if(buttonExists) return;

        // Find section to add button
        let section = await findSectionToAddButton();
        if (!section) return false;
        console.log("Section found!:", section)

        // Find renderer ctrls
        let rendererCtrls = await findRenderCtrls();
        if (!rendererCtrls.length) return false;
        console.log("Renderer ctrls found!:", rendererCtrls)

        // Find Root scope
        let rootScope = angular.element(document.querySelector('resources-tree-renderer')).scope();

        // Define on click handler for button
        let onclick = () => {
            for (let c = 0, size = rendererCtrls.length; c < size; c++) {
                rendererCtrls[c].collapsed = !rendererCtrls[c].collapsed;
            }

            rootScope.$apply();
        }
        console.log("On click function defined!")

        // Create button
        let toggleButton = await createTogglerButton(onclick);
        console.log("Toggle button created!:", toggleButton)


        // Add button to the section of resources
        section.append(toggleButton)
        console.log("Toggle button added to section!")

        return true;
    }

    await addButton();

    let previousURL = location.href;

    // Add event listener when route changes
    window.addEventListener('hashchange', async (event) => {
        console.log("Current URL:", location.href)
        console.log("Previous URL:", previousURL)

        if (location.href.includes(previousURL))
            return;
        
        previousURL = location.href;

        let route = new RegExp(/^.+\\/resources(?:|\\/.*)$/);

        if (route.test(location.href)) {
            await addButton();
        }
    })
})()
`)
document.body.append(scriptElement)