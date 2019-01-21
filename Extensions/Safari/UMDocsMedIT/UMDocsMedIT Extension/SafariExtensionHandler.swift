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
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        page.getPropertiesWithCompletionHandler { properties in
            NSLog("The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
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
        return SafariExtensionViewController.shared
    }
    
    override func popoverWillShow(in window: SFSafariWindow) {
        NSLog("Openning")
        window.getActiveTab { tab in
            if tab == nil {return}
            let curTab: SFSafariTab! = tab
            curTab.getActivePage { page in
                if page == nil {return}
                let curPage: SFSafariPage! = page
                NSLog("Sending Message")
                curPage.dispatchMessageToScript(withName: "Get Patient Data")
            }
        }
    }

}