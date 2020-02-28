matchOnlyAPIGateWay = new RegExp(/^https:\/\/console.aws.amazon.com\/apigateway\/home.*$/)

if(!matchOnlyAPIGateWay.test(location.href)){
    alert("This extension only works on API Gateway!")
}else{
    console.log("Toggling!")
    collapsableElements = document.querySelectorAll('ol ol span.backplane-collapse-button:not(.ng-hide)')
    
    for(let c = 0; c < collapsableElements.length; c++){
        collapsableElements[c].click()
    }
}
