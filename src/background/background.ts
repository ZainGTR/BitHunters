chrome.runtime.onInstalled.addListener(({ reason }) => {
    
      console.log("Hi from background!")
      console.log(reason)
    
  });

