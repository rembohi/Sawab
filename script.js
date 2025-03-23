document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = 'https://api.alquran.cloud/v1/surah/';
    
    // جلب جميع أزرار السور
    const surahButtons = document.querySelectorAll('.quran-button');

    surahButtons.forEach(button => {
        button.addEventListener("click", function () {
            const surahNumber = this.getAttribute("data-surah");
            loadSurah(surahNumber);
        });
    });

    async function loadSurah(surahNumber) {
        const apiUrl = `${baseUrl}${surahNumber}?edition=ar.alafasy`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('خطأ في جلب البيانات');

            const data = await response.json();
            if (data.status !== 'OK') throw new Error('خطأ في استجابة الـ API');

            // إخفاء قائمة السور
            document.getElementById('quranIndexList').style.display = 'none';
            document.getElementById('surahContent').style.display = 'block';

            // تحديث العنوان
            document.querySelector('#surahContent h2').textContent = data.data.name;

            // تحديث الآيات
            document.querySelector('#ayahList').innerHTML = 
                data.data.ayahs.map(ayah => `<p>(${ayah.numberInSurah}) ${ayah.text}</p>`).join('');

        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء تحميل السورة. تأكد من اتصالك بالإنترنت.');
        }
    }

    // زر العودة إلى القائمة
    document.querySelector('.back-button').addEventListener("click", function () {
        document.getElementById('quranIndexList').style.display = 'flex';
        document.getElementById('surahContent').style.display = 'none';
    });
});
