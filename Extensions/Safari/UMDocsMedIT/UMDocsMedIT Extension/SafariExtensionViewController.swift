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
        
//        self.labsOrderedList.removeAllItems()
//        self.labsOrderedList.addItems(withTitles: self.labsOrderedOptions)
//        self.labsOrderedList.selectItem(at: 1)
//        self.labsOrderedList.synchronizeTitleAndSelectedItem()
    }

    @IBAction func print(_ sender: Any) {
        
    }
    
    @IBAction func papItemSelected(_ sender: Any) {
        self.labsOrderedList.selectItem(at: 1)
        self.labsOrderedList.setTitle(self.labsOrderedList.itemTitle(at: 1))
    }
    
    public func setPatientName(_ name: String) {
        self.patientNameLabel.stringValue = "Patient Name: \(name)"
    }
}
