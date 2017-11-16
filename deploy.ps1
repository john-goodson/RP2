
$destination = "http://foo.wingtip.com/pwa/shared documents” 
$Files = get-childitem "C:\code\ResPlan2\RP2\dist\"

$webclient = New-Object System.Net.WebClient 
$webclient.UseDefaultCredentials = $true

Foreach($file in $Files) {
  $webclient.UploadFile($destination + "/" + $File.Name, "PUT", $File.FullName)
}