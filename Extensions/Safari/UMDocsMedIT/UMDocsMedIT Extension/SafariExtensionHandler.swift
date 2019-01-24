//
//  SafariExtensionHandler.swift
//  UMDocsMedIT Extension
//
//  Created by Kevin Davis on 1/15/19.
//  Copyright © 2019 Kevin Davis. All rights reserved.
//

import SafariServices
import AppKit
import Dispatch

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    var patientFullName: String = ""
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        switch(messageName) {
        case "patientData":
            if userInfo == nil {break}
            let curUserInfo: [String: Any] = userInfo!
            let patientData: [String: Any] = curUserInfo["data"] as! [String: Any]
            self.showPatientName(patientData)
            break;
        default:
            NSLog("Default message!")
        }
    }
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        // Not used
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        let shared = SafariExtensionViewController.shared
        return shared
    }
    
    override func popoverWillShow(in window: SFSafariWindow) {
        window.getActiveTab { tab in
            if tab == nil {return}
            let curTab: SFSafariTab! = tab
            curTab.getActivePage { page in
                if page == nil {return}
                let curPage: SFSafariPage! = page
                NSLog("Sending Message")
                curPage.dispatchMessageToScript(withName: "getPatientData")
            }
        }
    }
    
    func showPatientName(_ patientData: [String: Any]) {
        let firstname: String? = patientData["firstname"] as? String
        let lastname: String? = patientData["lastname"] as? String
        var fullname: String = ""
        if firstname == nil {
            fullname = "No patient data found"
        } else {
            fullname = "\(firstname!) \(lastname!)"
        }
        self.patientFullName = fullname
        
        let shared: SafariExtensionViewController = SafariExtensionViewController.shared
        shared.setPatientName(self.patientFullName)
        shared.patientData = patientData
    }

}
