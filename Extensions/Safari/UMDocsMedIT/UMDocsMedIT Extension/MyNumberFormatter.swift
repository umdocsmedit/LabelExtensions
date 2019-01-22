//
//  NumberFormatter.swift
//  UMDocsMedIT Extension
//
//  Created by Kevin Davis on 1/22/19.
//  Copyright © 2019 Kevin Davis. All rights reserved.
//

import Foundation

class MyNumberFormatter : NumberFormatter {
    override func isPartialStringValid(_ partialString: String, newEditingString newString: AutoreleasingUnsafeMutablePointer<NSString?>?, errorDescription error: AutoreleasingUnsafeMutablePointer<NSString?>?) -> Bool {
        if partialString.isEmpty {
            return true
        }
        
        if partialString.count > 2 {
            return false
        }
        
        return Int(partialString) != nil
    }
}
