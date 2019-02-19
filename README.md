# UM DOCS MedIT Label Extensions

[![Build Status](https://travis-ci.org/umdocsmedit/LabelExtensions.svg?branch=master)](https://travis-ci.org/umdocsmedit/LabelExtensions)

Here you will find chrome and safari extensions for easily printing labels for
patients at health fairs when viewing their data on RedCap

# Installation

For both safari and chrome extensions, ensure that you have DYMO Label
Software installed and running. The software can be downloaded [here](http://www.dymo.com/en-US/labelwriter-450-turbo-label-printer#tabContainer)

## Chrome

To install the extension visit the [installation](https://chrome.google.com/webstore/detail/umdocsmedit-redcap-printi/bplcgefbeoamokcdpfmhicohihlplkek?hl=en) page on the Chrome Web Store
and click on **Add to Chrome**

## Safari

Download the latest release by clicking on the release tab and clicking on the
latest release. Or click [here](https://github.com/umdocsmedit/LabelExtensions/releases/download/v0.1.0/UMDocsMedIT.app.zip)

Once downloaded, ensure that you **close your browser**, then:
1. Open the app
1. Click "Open in Safari Preferences..."
   - This should open Safari and show your extensions
1. Check off the extension
1. The extension icon should show up next to the address bar on your browser


# Usage

Most importantly, ensure the following:
 - DYMO Web service application is running
 - Label printer is connected to your computer and that your computer
   recognizes the printer

The extension can only print patient lab labels when the browser is open to
a current RedCap patient data page. You can verify that the extension has
found patient data by opening the extension and seeing the patient's name in
the window that pops up.
 - choose the number of labels to print
 - select the labs you'd like for the patient
 - Click print
