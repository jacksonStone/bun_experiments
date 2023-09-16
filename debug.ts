/// <reference lib="dom" />

async function debugReq() {
    const url = (document.getElementById('url') as HTMLInputElement).value;
    const method = (document.getElementById('method') as HTMLInputElement).value;
    const headers = (document.getElementById('headers') as HTMLInputElement).value;
    const body = (document.getElementById('body') as HTMLInputElement).value;
    const reqOptions: RequestInit =  {
        method,
    }
    if(body) {
        reqOptions.body = body;
    }
    if(headers) {
        reqOptions.headers = JSON.parse(headers);
    }
    console.log(await window.fetch(url,reqOptions))
}
async function toggleDebug() {
    const debugContainer: HTMLElement | null = document.getElementById("debugContainer");
    if (!debugContainer) return

    if((window as any).debug.isVisible) {
        debugContainer.style.display = "none";
        (window as any).debug.isVisible = false;
    } else {
        // Is not visible
        (window as any).debug.isVisible = true;
        debugContainer.style.display = "block";
    }
}
if(process.env.NODE_ENV !== "production") {
    document.addEventListener("DOMContentLoaded", function() {
        // Create a new div element
        var newDiv = document.createElement('div');
    
        // Set its ID to 'debug'
        newDiv.id = 'debug';
    
        newDiv.innerHTML = `
        <button onclick="debug.toggle()" id="debugButton" style="
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 1010;
        ">Debug</button>
        <div id="debugContainer" style="
        display: none; 
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: white;
        border: 1px solid black;
        padding: 10px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        width: 300px;"> <!-- I added width to constrain the container -->
    
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label for="url" style="flex: 1; text-align: left;">URL:</label>
            <input type="text" id="url" placeholder="Enter the URL" style="flex: 2;">
        </div>
    
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label for="method" style="flex: 1; text-align: left;">METHOD:</label>
            <select id="method" style="flex: 2;">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
            </select>
        </div>
    
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <label for="headers" style="flex: 1; text-align: left;">HEADERS:</label>
            <textarea id="headers" rows="4" placeholder="Enter the headers in JSON format" style="flex: 2;"></textarea>
        </div>
    
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <label for="body" style="flex: 1; text-align: left;">BODY:</label>
            <textarea id="body" rows="4" placeholder="Enter the request body here" style="flex: 2;"></textarea>
        </div>
    
        <div style="text-align: right;">
            <button onclick="debug.req()">Send</button>
        </div>
    </div>
    `
        // Append it to the end of the body
        document.body.appendChild(newDiv);
        document.getElementById('debugContainer')!.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        document.getElementById('debugButton')!.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        document.addEventListener('click', function(event) {
            if((window as any).debug.isVisible) {
                const debugContainer = document.getElementById('debugContainer');
                if(!debugContainer) return;
                // Check if the click was outside the debugContainer
                if (!debugContainer.contains(event.target as Node)) {
                    toggleDebug()
                }
            }
        });
    });
    
    
    (window as any).debug = {
        req: debugReq,
        toggle: toggleDebug 
    };
}
