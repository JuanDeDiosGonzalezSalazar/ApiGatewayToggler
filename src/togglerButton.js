scriptElement = document.createElement('script')
scriptElement.append(`
let insertButtonInterval = setInterval(() => {
    section = document.querySelector('#mainContentUiView > ui-view > ui-view > ui-view > resources > div > resources-tree > div > div.tree-nav-header')
    console.log('Finding section!');

    if(!section) return;
    clearInterval(insertButtonInterval)

    toggleButton = document.createElement('button')
    toggleButton.setAttribute('id', 'toggleButton')
    toggleButton.setAttribute('class', 'btn')
    toggleButton.setAttribute('type', 'button')
    toggleButton.setAttribute('style', 'margin-bottom: 5px;')
    toggleButton.append('Toggle')
    toggleButton.onclick = () => {
        if (typeof rendererCtrls == 'undefined') {
            rootScope = angular.element(document.querySelector('resources-tree-renderer')).scope();

            resourceTreeRenderers = document.querySelectorAll('resources-tree-renderer resources-tree-renderer')
            rendererCtrls = [];

            for (let c = 0, size = resourceTreeRenderers.length; c < size; c++) {
                let rendererCtrl = angular.element(resourceTreeRenderers[c]).scope().$$childHead.resourcesTreeRendererCtrl;
                rendererCtrl.collapsed = !rendererCtrl.collapsed;
                rendererCtrls.push(rendererCtrl)
            }

            rootScope.$apply();
        } else {
            for (let c = 0, size = rendererCtrls.length; c < size; c++) {
                rendererCtrls[c].collapsed = !rendererCtrls[c].collapsed;
            }

            rootScope.$apply();
        }
    }

    section.append(toggleButton)
}, 500)
`)
document.body.append(scriptElement)