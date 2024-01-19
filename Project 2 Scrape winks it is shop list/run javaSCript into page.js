var all_company=document.querySelectorAll("body > div");
function saveJson(textContent) {
    // Create a Blob from the text content
    const blob = new Blob([textContent], { type: "json" });

    // Create a link element
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = null;

    // Append the link to the document
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

const contentToSave = "This is the content to be saved.";



function getTextBetweenElements(startSelector, endSelector) {
    const startElement =startSelector;
    const endElement = endSelector;

    if (!startElement || !endElement) {
        console.error("One or both elements not found.");
        return "";
    }

    let result = "";
    let foundStart = false;

    Array.from(startElement.parentElement.children).forEach((child) => {
        if (child === startElement) {
            foundStart = true;
        } else if (child === endElement) {
            foundStart = false;
        } else if (foundStart) {
            result += child.textContent || "";
        }
    });

    return result.trim();
}


const query_comp_nam=("div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerLogo.col-12.col-sm > h4")
const query_branch_name=`div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerInfo.col-12.col-sm > h6`
const address = `div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerInfo.col-12.col-sm > div > div.singleRetailerAddress.col-12.col-sm-6 > p:nth-child(1)`
const telephone =`div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerInfo.col-12.col-sm > div > div.singleRetailerAddress.col-12.col-sm-6 > p:nth-child(2) > a:nth-child(3)`
const fax_q=`p:nth-child(2) > br:nth-child(6)`
const email =`div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerInfo.col-12.col-sm > div > div.singleRetailerAddress.col-12.col-sm-6 > p:nth-child(2) > a:nth-child(10)`;
const web = `div > div > div.col-12.col-lg-6.singleRetailerInfoContent.mb-3 > div > div.singleRetailerInfo.col-12.col-sm > div > div.singleRetailerAddress.col-12.col-sm-6 > p:nth-child(2) > a:nth-child(14)`;
var all_company_in_json = {}
for(let i =0;i<(all_company.length);i++){
all_company_in_json[i]={}
all_company_in_json[i]["Company name"] = ((all_company[i].querySelector(query_comp_nam) ?? {}).textContent ?? "").trim();
all_company_in_json[i]["Brach of Company"]=((all_company[i].querySelector(query_branch_name) ?? {}).textContent ?? "").trim();
all_company_in_json[i]["Address"]=((all_company[i].querySelector(address) ?? {}).textContent ?? "").trim();
all_company_in_json[i]["Telephone"]=((all_company[i].querySelector(telephone) ?? {}).textContent ?? "").trim();
try{
var e1 =all_company[i].querySelector(fax_q);
var e2 = all_company[i].querySelector(fax_q).nextElementSibling;

var node =e1.nextSibling;
    let textContent = "";
while (node && node !== e2) {
    if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
    }
    node = node.nextSibling;
}
    all_company_in_json[i]["Fax"]=(textContent.trim());
}
    catch{all_company_in_json[i]["Fax"]="";}


all_company_in_json[i]["Email"]=((all_company[i].querySelector(email) ?? {}).textContent ?? "").trim();
all_company_in_json[i]["Website"]=((all_company[i].querySelector(web) ?? {}).textContent ?? "").trim();

}
console.log(all_company_in_json[0])