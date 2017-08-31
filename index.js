const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const kms = new AWS.KMS()

// *** make sure this exists.  might've been deleted to save on monthy CMK costs ***
const keyId = 'arn:aws:kms:us-east-1:529276214230:key/5dc341ba-ee58-478d-b587-3885a42c766e'

const encrypt = (data) => {
    const params = {
        KeyId: keyId,
        Plaintext: data
    }
    return kms.encrypt(params).promise()
}

const decrypt = (data) => {
    const params = {
        CiphertextBlob: data
    }
    
    return kms.decrypt(params).promise()
}

(async () => {
    const data = 'secret'
    try {
        const resp = await encrypt(data)
        const cipherText = resp.CiphertextBlob
        const decruptResp = await decrypt(cipherText)
        const plainText = decruptResp.Plaintext
        console.log('cipherText', cipherText)
        console.log('plainText', plainText.toString('utf8'))    
    } catch(err) {
        console.error(err)
    }
})()

