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
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared;
    }()

    @IBAction func print(_ sender: Any) {
        
    }
    
    public func setPatientName(_ name: String) {
        self.patientNameLabel.stringValue = "Patient Name: \(name)"
    }
    
}
