//
//  SafariExtensionViewController.swift
//  UMDocsMedIT Extension
//
//  Created by Kevin Davis on 1/15/19.
//  Copyright © 2019 Kevin Davis. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    @IBOutlet weak var patientNameLabel: NSTextField!
    @IBOutlet weak var numLabelsField: NSTextField!
    @IBOutlet weak var labsOrderedList: NSPopUpButton!
    @IBOutlet weak var printButton: NSButton!
    
    let labsOrderedOptions: [String] = ["CRC", "Pap Smear", "Lipids"]
    
    var patientData: [String: Any] = [:]
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:276, height:150)
        return shared;
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        numLabelsField.formatter = MyNumberFormatter()
        DispatchQueue.main.async {
            self.numLabelsField.resignFirstResponder()
            self.printButton.becomeFirstResponder()
        }
    }

    @IBAction func print(_ sender: Any) {
        SFSafariApplication.getActiveWindow { window in
            if window == nil {
                NSLog("No window")
                return
            }
            
            window!.getActiveTab { tab in
                if tab == nil {
                    NSLog("No tab")
                    return
                }
                
                tab!.getActivePage { page in
                    if page == nil {
                        NSLog("No page")
                        return
                    }
                    let data: [String: Any] = [
                        "patientData": self.patientData,
                        "numLabels": self.numLabelsField.stringValue,
                        "labsOrdered": self.labsOrderedList.titleOfSelectedItem!
                    ]
                    if self.patientData["firstname"] == nil {
                        SafariExtensionViewController.alert("No Patient Data Found", "No patient data found.\r\nEnsure that you are on a RedCap patient data page")
                    } else {
                        page!.dispatchMessageToScript(withName: "printLabel", userInfo: data)
                    }
                }
            }
        }
    }
    
    @IBAction func papItemSelected(_ sender: Any) {
        self.labsOrderedList.selectItem(at: 1)
        self.labsOrderedList.setTitle(self.labsOrderedList.itemTitle(at: 1))
    }
    
    public func setPatientName(_ name: String) {
        self.patientNameLabel.stringValue = "Patient Name: \(name)"
    }
    
    static func alert(_ mainMessage: String, _ infoMessage: String) {
        DispatchQueue.main.sync {
            let curAlert: NSAlert = NSAlert()
            curAlert.alertStyle = NSAlert.Style.informational
            curAlert.messageText = mainMessage
            curAlert.informativeText = infoMessage
            curAlert.runModal()

        }
    }
}
