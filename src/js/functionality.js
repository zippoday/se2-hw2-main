var DEBUG = true;

if(DEBUG)
{
    console.log("DEBUG ON");
}

// หากต้องการแสดงผลใน console ให้ใช้ฟังก์ชั่นนี้
// หากไม่ต้องการแสดงผลใน console ให้ปรับค่า DEBUG = false;
function dbg()
{
    if(DEBUG)
    {
        console.log.apply(null, arguments);
    }
}

// ตารางเดือน
var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฏาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

// ตัวแปรสำหรับเก็บค่าวันที่ถูกคลิก เดือน/ปีที่ถูกเลือก
var date = new Date();
var currentDay = -1;
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();

// ตัวแปรสำหรับเก็บข้อมูลการนัดที่ถูกเพิ่ม/ลบ
// Structure คือ 
/* 
{
    "ปี-เดือน-วัน": [{"id": ไอดี, "desc": คำอธิบายนัด, "time": คำอธิบายเวลานัด}, {"id": ไอดี, "desc": คำอธิบายนัด, "time": คำอธิบายเวลานัด} ...],
    "ปี-เดือน-วัน": [{"id": ไอดี, "desc": คำอธิบายนัด, "time": คำอธิบายเวลานัด}, {"id": ไอดี, "desc": คำอธิบายนัด, "time": คำอธิบายเวลานัด} ...]
    ...
}
ตัวอย่าง
{
    "2022-0-11": [{"id": 0, "desc": "นัดเจอแฟนวันที่ 11 มกราคม", "time": "10 โมงที่เก่า"}, {"id": 1, "desc": "นัดเจอกิ๊กวันที่ 11 มกราคม", "time": "สองทุ่มที่เก่า"}],
    "2022-11-7": [{"id": 0, "desc": "นัดเจอแฟนเก่าวันที่ 7 ธันวาคม", "time": "10 โมงที่เก่า"}]
}
*/
let eStore = {}; // ให้ใช้ API เรียกข้อมูล JSON มาจากฐานข้อมูลเซิฟเวอร์

// ตัวอย่างการใช้ GET JSON
async function getDataFromServer()
{
    let res = await fetch('/data');
    res = await res.json();

    return res;
}

// ตัวอย่างการใช้ POST JSON โดยตัวอย่างนี้ ข้อมูลจะเรียกมาจาก Global variable ชื่อ eStore 
async function postDataToServer()
{
    let res = await fetch('/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eStore)
    });
}

// ฟังก์ชั่นสำหรับล้างปฏิทิน
function clearCalendar()
{
    document.getElementById("week1").innerHTML = "";
    document.getElementById("week2").innerHTML = "";

    // สังเกตดูว่ามี element ไหนอีกที่เราต้องเคลียจากตาราง แล้วเติมให้ถูกต้อง

}

// ฟังก์ชั่นสำหรับอัพเดทปฏิทิน คือ ล้างก่อน แล้วเติมข้อมูล
function updateCalendar()
{
    //clearCalendar();

    // ใส่ค่าที่อัพเดทให้กับปฏิทิน

}

// ฟังก์ชั่นสำหรับเลื่อนเดือนไปเดือนก่อนหน้า
function prevMonth()
{
    // ดูตัวอย่างจากฟังก์ชั่น nextMonth() อย่าลืมเช็คกรณีที่เลขที่เดือนน้อยกว่า 0 ให้วนกลับไปที่ 11

}

// ฟังก์ชั่นสำหรับเลื่อนเดือนไปเดือนถัดไป
function nextMonth()
{
    // ตัวแปร currentMonth ควรมีค่าตั้งแต่ 0-11 (0 คือ มกราคม, 11 คือ ธันวาคม)
    // เพิ่มค่าตัวแปร currentMonth อีก 1 ถ้าเพิ่มแล้วเกิน 12 ให้วนกลับไป 0
    currentMonth = (currentMonth + 1) % 12;

    updateCalendar();
}

// ฟังก์ชั่นสำหรับเลื่อนปีไปปีก่อนหน้า
function prevYear()
{
    // ตัวแปร currentYear ควรมีค่ามากกว่า 0
    // ลบค่าตัวแปร currentYear ลงหนึ่งแล้วอัพเดทปฏิทิน
    currentYear -= 1;

    if(currentYear < 0)
    {
        currentYear = 0;
    }

    updateCalendar();
}

// ฟังก์ชั่นสำหรับเลื่อนปีไปปีถัดไป
function nextYear()
{
    // ดูตัวอย่างจากฟังก์ชั่น prevYear()
}

// ฟังก์ชั่นสำหรับเซฟนัดสำหรับวันที่คลิก
function saveData()
{
    // สิ่งที่ต้องทำ loop เช็ค form ทั้งหมดใน Modal และดึงค่าที่ผู้ใช้อาจจะอัพเดทออกมา ก่อนที่จะเซฟลงไปที่ฐานข้อมูลของเรา
    // คำแนะนำ: ใช้ document.getElementsByClassName เพื่อที่จะดึงค่าของ textarea และ input ของคลาส modal-descriptions และ modal-times
    // ค่าที่ return จะเป็น array ซึ่งเราจะต้องใช้ for loop ในการเข้าถึงค่าของแต่ละตัว

}

// ฟังก์ชั่นสำหรับแสดงผล Modal (รายละเอียดวันที่คลิก)
function showModal(day)
{
    let modal = document.getElementById("detail-modal");

    modal.style.display = "block";
}

// ฟังก์ชั่นสำหรับจัดการการกดปุ่มเพิ่มนัด
function addEvent()
{
    // ใช้ document.getElementById ดึงค่า id=desc กับ id=time ออกมา และเพิ่มเข้าไปในฐานข้อมูล รวมถึงอัพเดทหน้า Modal ให้แสดงผลนัดที่เพิ่มเข้าไป

}

// ฟังก์ชั่นเมื่อมีการกดปิด Modal
function closeModal()
{
    let modal = document.getElementById("detail-modal");

    modal.style.display = "none";
    saveData();
    updateCalendar();
    populateSummary();
}

// ฟังก์ชั่นสำหรับใส่ข้อมูลส่วนสรุปนัดทั้งหมด
// ตอนนี้ส่วนแสดงผลได้ใช้ ordered list (<ol>) ในการแสดงผล และยังไม่มีการตกแต่งใดๆ ให้นักเรียนแก้ไขฟังก์ชั่นนี้ให้การแสดงผลสวยงาม เช่น ใส่ css ให้กับ list หรือ แก้ list ให้เป็น table หรือ element ประเภทอื่นๆ และเพิ่ม CSS ให้มัน
function populateSummary()
{

}