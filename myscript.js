var body = document.body;
const myForm = document.getElementById('inputForm')
const textField = document.getElementById('textField')
const output = document.getElementById('output')
const textArea = document.getElementById("textArea")
const checkBox = document.getElementById("checkBox")
const copyButton = document.getElementById("copyButton")

output.textContent = `init(from decoder: Decoder) throws {
    let values = try decoder.container(keyedBy: CodingKeys.self)
    isService = try values.decodeIfPresent(Bool.self, forKey: .isService) ?? false 
    artistList = try values.decodeIfPresent([ArtistModel].self, forKey: .artistList) 
    albumImg = try values.decodeIfPresent(String.self, forKey: .albumImg) 
    albumImgLarge = try values.decodeIfPresent(String.self, forKey: .albumImgLarge) 
}`

myForm.addEventListener('submit', function 콜백함수(e) {
    e.preventDefault();
    // console.log(checkBox.checked)
    // console.log(textField.value);
    // console.log(textArea.value);
    // output.textContent = textArea.textContent;
    let commands = textArea.value.trim().split("\n")
    indent = "    "
    let result = `init(from decoder: Decoder) throws {
${indent}let values = try decoder.container(keyedBy: CodingKeys.self)
`
    for (command of commands) {
        if (command.length == 0) {
            continue;
        }
        let commandArr = command.split(/(\s+)/).filter(function (e) {
            return e.trim().length > 0;
        });
        // console.log(commandArr)
        let letOrVar = commandArr[0]
        if (letOrVar != "let" && letOrVar != "var") {
            continue;
        }
        let variableName = commandArr[1].split(":")[0]
        if (variableName.endsWith(",")) {
            variableNames = commandArr.slice(1, -1)
            let typeName = commandArr[commandArr.length - 1].split("?")[0]
            let isOptional = commandArr[commandArr.length - 1].endsWith("?")
            for (variableName of variableNames) {
                variableName = variableName.slice(0, -1)
                let line = `${variableName} = try${checkBox.checked ? "?" : ""} values.decodeIfPresent(${typeName}.self, forKey: .${variableName})`
                if (!isOptional) {
                    if (typeName == "Bool") {
                        line += " ?? false"
                    } else if (typeName.startsWith("[") && typeName.endsWith("]")) {
                        line += " ?? []"
                    } else {
                        line += ` ?? ""`
                    }
                }
                result += `${indent}${line} \r\n`
            }
        }
        else {
            let typeName = commandArr[2].split("?")[0]
            let isOptional = commandArr[2].endsWith("?")
            // console.log(letOrVar, variableName, typeName, isOptional)
            // console.log("variableName: ", variableName)
            // console.log("typeName: ", typeName)
            // console.log("isOptional: ", isOptional)
            // console.log("--------------")
            let line = `${variableName} = try${checkBox.checked ? "?" : ""} values.decodeIfPresent(${typeName}.self, forKey: .${variableName})`
            if (!isOptional) {
                if (typeName == "Bool") {
                    line += " ?? false"
                } else if (typeName.startsWith("[") && typeName.endsWith("]")) {
                    line += " ?? []"
                } else {
                    line += ` ?? ""`
                }
            }
            result += `${indent}${line} \r\n`
        }
        // console.log(line)
        // result += `${line} </br>`
    }
    result += `}`
    output.textContent = result
});
copyButton.addEventListener('click', function 콜백함수(e) {
    console.log("hi")
    output.select()
    navigator.clipboard.writeText(output.value);
});