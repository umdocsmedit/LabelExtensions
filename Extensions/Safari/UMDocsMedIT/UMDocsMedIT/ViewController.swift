//
//  ViewController.swift
//  UMDocsMedIT
//
//  Created by Kevin Davis on 1/15/19.
//  Copyright © 2019 Kevin Davis. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = "UMDocsMedIT";
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "kcdvs.UMDocsMedIT-Extension") { error in
            if let _ = error {
                let err: Error = error!;
                // Insert code to inform the user that something went wrong.
                print("error \(err._code)");
            }
        }
    }

}
