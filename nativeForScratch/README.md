# What are these?
These extensions are designed to function in *native Scratch*, which means you can upload projects with custom extensions onto the [official Scratch website](https://scratch.mit.edu).  
# How to use them
### On the project page
To use these on the project page, you have to either create a bookmarklet with a `javascript:` URL based on the code and then click it or just run the code in the browser console. Either way, it needs to be run before the project starts.
### In the editor
In the editor, it is slightly different. The easiest way is to find the project page, load the extension, and then click on `see inside`.
## DISCLAIMER
These extensions will need to be triggered every time the project is loaded. Therefore, if someone tries to run your project without activating the script first, your project will likely break. It is best to include something like
```scratch
if <not<JS | [true]>> then {
  say[Custom extensions not loaded. Please reload the page and load them before running the project.]
} else {
  say[Custom extensions loaded, begin setup.]
}
```
to handle errors better.
### Credits
Thanks to [IronBill05 on Scratch](https://scratch.mit.edu/users/IronBill05/) for the code to find the VM and register the extension and some of the other code for the JavaScript extension.
