(function() {
    document.body.appendChild(document.createElement('script')).src = 'https://umdocs.mededu.miami.edu/wp-content/uploads/2016/09/DYMO.Label_.Framework.2.0.2.js';
    function frameworkInitShim() {
        try {
            dymo.label.framework.trace = 1;
        } catch (err) {
            window.alert("Initialized on this page. You can print now.")
        }
        dymo.label.framework.init(startupCode);
    }

    function startupCode() {
        var printers = dymo.label.framework.getPrinters();
        try {
            var fullfairname = document.getElementById('contextMsg').children[1].innerText;
            var arm = parseInt(fullfairname.split("Arm ")[1][0]);
            var site = 'LHHF';
            switch (arm) {
                case 1:
                    site = 'LHHF';
                    break;
                case 2:
                    site = 'HHF';
                    break;
                case 3:
                    site = 'SDHF';
                    break;
                case 4:
                    site = 'UKHF';
                    break;
                case 5:
                    site = 'MTHF';
                    break;
                case 6:
                    site = 'BPKHF';
                    break;
                case 7:
                    site = 'KWHF';
                    break;
                case 8:
                    site = 'JJHF';
                    break;
                case 9:
                    site = 'LCHF';
                    break;
                case 10:
                    site = 'LOW';
                    break;
            }
            console.log(site);
            var labtype = 0;
            var labsordered = 'Lipid Profile';
            var numberoflabelsLab = 4;
            var numberoflabelsAddress = 0;
            if (labtype == 0) {
                labsordered = 'Pap Smear';
                numberoflabelsLab = 2;
                numberoflabelsAddress = 2;
            }
            var firstname = document.getElementById('first_name-tr').children[1].children[0].value;
            var lastname = document.getElementById('last_name-tr').children[1].children[0].value;
            var middleinitial = document.getElementById('mi-tr').children[1].children[0].value;
            var DOB = document.getElementById('birthday-tr').children[1].children[0].value;
            try {
                var MRN = document.getElementById('record_id-tr').children[1].children[0].value;
            } catch (err) {
                var MRN = document.getElementById('record_id-tr').children[1].innerText;
            }
            var sexNum = document.getElementById('sex-tr').children[1].children[0].value;
            var streetAddress = document.getElementById('street-tr').children[1].children[0].value;
            var apartment = document.getElementById('apartment-tr').children[1].children[0].value;
            var city = document.getElementById('city-tr').children[1].children[0].value;
            var stateNum = document.getElementById('state-tr').children[1].children[0].children[0].value;
            var stateString = document.getElementById('state-tr').children[1].children[0].children[0].children[stateNum].text.toUpperCase();
            var state = [];
            switch (stateString) {
                case "ALABAMA":
                    state = "AL";
                    break;
                case "ALASKA":
                    state = "AK";
                    break;
                case "ARIZONA":
                    state = "AZ";
                    break;
                case "ARKANSAS":
                    state = "AR";
                    break;
                case "CALIFORNIA":
                    state = "CA";
                    break;
                case "COLORADO":
                    state = "CO";
                    break;
                case "CONNECTICUT":
                    state = "CT";
                    break;
                case "DELAWARE":
                    state = "DE";
                    break;
                case "DISTRICT OF COLUMBIA":
                    state = "DC";
                    break;
                case "FLORIDA":
                    state = "FL";
                    break;
                case "GEORGIA":
                    state = "GA";
                    break;
                case "HAWAII":
                    state = "HI";
                    break;
                case "IDAHO":
                    state = "ID";
                    break;
                case "ILLINOIS":
                    state = "IL";
                    break;
                case "INDIANA":
                    state = "IN";
                    break;
                case "IOWA":
                    state = "IA";
                    break;
                case "KANSAS":
                    state = "KS";
                    break;
                case "KENTUCKY":
                    state = "KY";
                    break;
                case "LOUISIANA":
                    state = "LA";
                    break;
                case "MAINE":
                    state = "ME";
                    break;
                case "MARYLAND":
                    state = "MD";
                    break;
                case "MASSACHUSETTS":
                    state = "MA";
                    break;
                case "MICHIGAN":
                    state = "MI";
                    break;
                case "MINNESOTA":
                    state = "MN";
                    break;
                case "MISSISSIPPI":
                    state = "MS";
                    break;
                case "MISSOURI":
                    state = "MO";
                    break;
                case "MONTANA":
                    state = "MT";
                    break;
                case "NEBRASKA":
                    state = "NE";
                    break;
                case "NEVADA":
                    state = "NV";
                    break;
                case "NEW HAMPSHIRE":
                    state = "NH";
                    break;
                case "NEW JERSEY":
                    state = "NJ";
                    break;
                case "NEW MEXICO":
                    state = "NM";
                    break;
                case "NEWYORK":
                    state = "NY";
                    break;
                case "NORTHCAROLINA":
                    state = "NC";
                    break;
                case "NORTHDAKOTA":
                    state = "ND";
                    break;
                case "OHIO":
                    state = "OH";
                    break;
                case "OKLAHOMA":
                    state = "OK";
                    break;
                case "OREGON":
                    state = "OR";
                    break;
                case "PENNSYLVANIA":
                    state = "PA";
                    break;
                case "RHODE ISLAND":
                    state = "RI";
                    break;
                case "SOUTH CAROLINA":
                    state = "SC";
                    break;
                case "SOUTH DAKOTA":
                    state = "SD";
                    break;
                case "TENNESSEE":
                    state = "TN";
                    break;
                case "TEXAS":
                    state = "TX";
                    break;
                case "UTAH":
                    state = "UT";
                    break;
                case "VERMONT":
                    state = "VT";
                    break;
                case "VIRGINIA":
                    state = "VA";
                    break;
                case "WASHINGTON":
                    state = "WA";
                    break;
                case "WEST VIRGINIA":
                    state = "WV";
                    break;
                case "WISCONSIN":
                    state = "WI";
                    break;
                case "WYOMING":
                    state = "WY";
                    break;
                case "OTHER":
                    state = " ? ";
                    break;
            }
            var zip = document.getElementById('zip_code-tr').children[1].children[0].value;
            var phone = document.getElementById('phone_number-tr').children[1].children[0].value;
            var sex = [];
            console.log(sexNum);
            switch (sexNum) {
                case "1":
                    sex = 'M';
                    break;
                case "2":
                    sex = 'F';
                    break;
                case "3":
                    sex = 'Other';
                    break;
                default:
                    sex = 'NA';
                    break;
            }
        } catch (err) {
            console.log(err);
            window.alert("Sorry! Can't find RedCap data. Are you on the registration page?");
            return;
        }
        var nameXml = '<?xml version="1.0" encoding="utf-8"?> <DieCutLabel Version="8.0" Units="twips"> <PaperOrientation>Landscape</PaperOrientation> <Id>LargeAddress</Id> <PaperName>30321 Large Address</PaperName> <DrawCommands> <RoundRectangle X="0" Y="0" Width="2025" Height="5020" Rx="270" Ry="270" /> </DrawCommands> <ObjectInfo> <TextObject> <Name>TEXT_1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>' + streetAddress + ', ' + apartment + '\n' + city + ', ' + state + ' ' + zip + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="430" Width="2490" Height="490" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Name: ' + lastname + ', ' + firstname + ' ' + middleinitial + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="150" Width="3260" Height="270" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT__1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Phone: ' + phone + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="1020" Width="2450" Height="260" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT_2</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Sex: ' + sex + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="3200" Y="150" Width="1500" Height="240" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT_3</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>DOCS ID: ' + MRN + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="3200" Y="430" Width="1500" Height="230" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT__2</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>DOB: ' + DOB + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="3200" Y="730" Width="1500" Height="230" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT___1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Site: ' + site + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="3200" Y="1020" Width="1500" Height="230" /> </ObjectInfo> </DieCutLabel>';
        var labelXml = '<?xml version="1.0" encoding="utf-8"?> <DieCutLabel Version="8.0" Units="twips"> <PaperOrientation>Landscape</PaperOrientation> <Id>LargeAddress</Id> <PaperName>30321 Large Address</PaperName> <DrawCommands> <RoundRectangle X="0" Y="0" Width="2025" Height="5020" Rx="270" Ry="270" /> </DrawCommands> <ObjectInfo> <TextObject> <Name>TEXT_1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Patient Name: ' + lastname + ', ' + firstname + ' ' + middleinitial + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="430" Width="4613" Height="230" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Patient ID: ' + MRN + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="150" Width="3260" Height="270" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT___1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Date of Birth: ' + DOB + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="730" Width="2450" Height="260" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT__1</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Labs Ordered:</String> <Attributes> <Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="1020" Width="2450" Height="200" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT_2</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Fair Site: ' + site + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="3225" Y="150" Width="1710" Height="240" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT__2</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Right</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>Sex: ' + sex + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="2055" Y="730" Width="2880" Height="230" /> </ObjectInfo> <ObjectInfo> <TextObject> <Name>TEXT___2</Name> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> <BackColor Alpha="0" Red="255" Green="255" Blue="255" /> <LinkedObjectName></LinkedObjectName> <Rotation>Rotation0</Rotation> <IsMirrored>False</IsMirrored> <IsVariable>False</IsVariable> <HorizontalAlignment>Left</HorizontalAlignment> <VerticalAlignment>Top</VerticalAlignment> <TextFitMode>None</TextFitMode> <UseFullFontHeight>True</UseFullFontHeight> <Verticalized>False</Verticalized> <StyledText> <Element> <String>' + labsordered + '</String> <Attributes> <Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /> <ForeColor Alpha="255" Red="0" Green="0" Blue="0" /> </Attributes> </Element> </StyledText> </TextObject> <Bounds X="320" Y="1303" Width="2450" Height="199.999999999999" /> </ObjectInfo> </DieCutLabel>';
        console.log("Printers: " + printers.length);
        if (printers.length == 0) throw window.alert("No printers connected or installed.");
        else {
            var printer = [];
            var chosenPrinter = [];
            for (var i = 0; i < printers.length; i++) {
                printer = printers[i];
                console.log(printer.isConnected);
                if (printer.isConnected) {
                    console.log("connected");
                    chosenPrinter = printers[i];
                    break;
                }
            }
            console.log(chosenPrinter);
            if (chosenPrinter.length == 0) {
                window.alert("Sorry! No printers connected");
                return;
            } else {
                var label = dymo.label.framework.openLabelXml(labelXml);
                var label2 = dymo.label.framework.openLabelXml(nameXml);
                for (var i = 0; i < numberoflabelsAddress; i++) {
                    label2.print(chosenPrinter.name);
                }
                for (var i = 0; i < numberoflabelsLab; i++) {
                    label.print(chosenPrinter.name);
                }
            }
        }
    }
    frameworkInitShim();
})();
