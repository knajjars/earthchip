module.exports = {
  mailTemplate: (message) => { return `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title>
        
      </title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a { padding:0; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
        .ExternalClass * { line-height:100%; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
        @media only screen and (max-width:480px) {
          @-ms-viewport { width:320px; }
          @viewport { width:320px; }
        }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
      <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      
    <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
    <!--<![endif]-->

  
      
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-50 { width:50% !important; max-width: 50%; }
    }
  </style>
  

      <style type="text/css">
      
      
      </style>
      
    </head>
    <body style="background-color:#eee;">
      
      
    <div
       style="background-color:#eee;"
    >
      
    
    <!--[if mso | IE]>
    <table
       align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
    >
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
  
    
    <div  style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;"
      >
        <tbody>
          <tr>
            <td
               style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"
            >
              <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              
      <tr>
    
          <td
             class="" style="vertical-align:top;width:300px;"
          >
        <![endif]-->
          
    <div
       class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
    >
      
    <table
       border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
    >
      
          <tr>
            <td
               align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
            >
              
    <div
       style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#555;"
    >
    <h2>Welcome to Tomaat!</h2>
    <h3>You're nearly done with setting up your account</h3>
    <a href="${message}">Please click this link to start your Tomaat journey</a>
    </div>
  
            </td>
          </tr>
        
    </table>
  
    </div>
  
        <!--[if mso | IE]>
          </td>
        
          <td
             class="" style="vertical-align:top;width:300px;"
          >
        <![endif]-->
          
    <div
       class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
    >
      
    <table
       border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
    >
      
          <tr>
            <td
               align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"
            >
              
    <div
       style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#555;"
    >
            <img style="width:250px;" src="https://images-na.ssl-images-amazon.com/images/I/71qBu8N6EmL._SY450_.jpg" alt="">
    </div>
  
            </td>
          </tr>
        
    </table>
  
    </div>
  
        <!--[if mso | IE]>
          </td>
        
      </tr>
    
                </table>
              <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  
    
    <!--[if mso | IE]>
        </td>
      </tr>
    </table>
    <![endif]-->
  
  
    </div>
  
    </body>
  </html>
` }};