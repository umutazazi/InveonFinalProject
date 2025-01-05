# InveonFinalProject
# Proje Açıklaması

Bu proje, **JWT Token Authentication** ve **Refresh Token** ile güvenli bir üyelik sistemi sunan bir **.NET 9 Mini Kurs E-Ticaret Sitesi** uygulamasıdır. Uygulama, **N Layered Architecture** prensiplerini takip ederek modern, modüler ve ölçeklenebilir bir yapıda geliştirilmiştir. 

![resim](https://github.com/user-attachments/assets/9eb20175-9635-4c4e-a2a6-b1d3f942b9ae)


Projenin temel amacı, kullanıcıların ve eğitmenlerin farklı rollere sahip olduğu bir platform oluşturmak ve kurs alışverişi, kurs yönetimi gibi işlevleri güvenli bir şekilde sunmaktır. Backend .NET Web API ile geliştirilmiş, frontend kısmı ise **React** kullanılarak oluşturulmuştur.

## Temel Kullanım Senaryoları:
1. Kullanıcılar, platforma kaydolabilir ve giriş yapabilir.
2. Kullanıcılar, kurs satın alabilir ve ders içeriklerine erişebilir.
3. Eğitmenler, kurs oluşturabilir ve içeriklerini yönetebilir.

İşte "Başlangıç" bölümü için Markdown formatında bir taslak:

## Başlangıç

Bu bölümde, projenin yerel bir makinede nasıl kurulacağını ve çalıştırılacağını adım adım açıklayacağız. Aşağıdaki talimatları takip ederek projeyi başarıyla çalıştırabilirsiniz.

### Gereksinimler

Projenin çalıştırılabilmesi için aşağıdaki araçların sisteminizde yüklü olması gereklidir:

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18 veya üzeri)](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server)
- Bir metin editörü veya IDE (Örneğin: [Visual Studio](https://visualstudio.microsoft.com/) veya [Visual Studio Code](https://code.visualstudio.com/))

### Kurulum Adımları
1. **Depoyu Klonlayın**  
   Terminal veya komut istemcisinde aşağıdaki komutu kullanarak projeyi klonlayın:
   ```bash
   git clone https://github.com/umutazazi/InveonFinalProject.git
   cd proje-adi
   ```

2.**Backend Bağımlılıklarını Yükleyin**
```bash
cd Backend
dotnet restore
```
3.**Veritabanını Ayarlayın**
- appsettings.json dosyasını açın ve SQL Server bağlantı dizesini (ConnectionStrings) kendi sisteminize göre düzenleyin:
 ```
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProjeAdiDb;Trusted_Connection=True;"
}
```
4. **Migration işlemlerini çalıştırarak veritabanını oluşturun**
```
dotnet ef database update
```

5.**Frontend Bağımlılıklarını Yükleyin**
```
cd ../Frontend
npm install
```
6.**Backend'i Çalıştırın**
- Backend API'sini başlatmak için aşağıdaki komutu çalıştırın:
  ```
  dotnet run
  ```
7. **Frontend'i Çalıştırın**
- Frontend uygulamasını başlatmak için aşağıdaki komutu çalıştırın:
 ```
  npm start
  ```

## Kullanım

Bu bölümde, projeyi nasıl kullanabileceğinize dair detaylı bir kılavuz bulabilirsiniz. Kullanıcıların temel fonksiyonları anlaması ve projeyi etkin bir şekilde kullanabilmesi için gerekli bilgiler aşağıda verilmiştir.

### API Kullanımı (Backend)

Projenin Backend kısmı bir **RESTful API** sağlar. Aşağıda temel API uç noktalarının açıklamaları verilmiştir. Postman veya benzeri bir araç kullanarak bu uç noktaları test edebilirsiniz.

#### Kullanıcı İşlemleri
- **Kayıt Ol**  
  Yeni bir kullanıcı oluşturmak için:
  ```http
  POST /api/User/

  Body (JSON):
  {
    "username": "kullaniciadi",
    "email": "kullanici@example.com",
    "password": "Sifre123!"
  }
  ```
 -**Giriş Yap**
Kullanıcı girişi yapmak için:
```http
POST /api/Auth/CreateToken

Body (JSON):
{
  "email": "kullanici@example.com",
  "password": "Sifre123!"
}
```

Yanıt: Başarılı olursa, JWT token ve Refresh token döner.


**Kurs İşlemleri**

-Mevcut kursları görüntülemek için:
```
GET /api/Courses
```

Yeni Kurs Oluştur (Eğitmenler için)
Yeni bir kurs eklemek için:

    POST /api/Courses

    Body (JSON):
    {
      "id": 1,
      "name": "JavaScript Başlangıç Rehberi",
      "description": "Bu kurs, JavaScript'in temellerini öğrenmek isteyenler için hazırlanmıştır.",
      "price": 199.99,
      "category": "Programlama",
      "imageUrl": "https://dummyimage.com/600x400/a1a1a1/ffffff&text=Course",
      "instructorName": "Ali Veli",
      }

 - Not: Bu uç nokta sadece "eğitmen" rolüne sahip kullanıcılar için erişilebilir bu yüzden Bearer eklemelisiniz. Role biligisi payload ile alınmakta.

Frontend Kullanımı
**Kullanıcı Girişi**

  - Kayıt Olun: Ana sayfadaki "Kayıt Ol" butonuna tıklayarak bir kullanıcı hesabı oluşturun.
  - Giriş Yapın: Giriş bilgilerinizi kullanarak oturum açın.

**Kurs Satın Alma**

  - Giriş yaptıktan sonra kurslar listesini görüntüleyin.
  - Satın almak istediğiniz kursu seçin ve "Satın Al" butonuna tıklayın.
  - Başarılı bir ödeme işlemi sonrası kurslarınıza profil kısmından erişebilirsiniz.

**Kurs Oluşturma (Eğitmenler için)**

 - Giriş yaptıktan sonra eğitmen hesabınızla "Kurs Oluştur" sayfasına gidin.
 - Kurs bilgilerini doldurun ve "Kaydet" butonuna tıklayın.

**Roller ve Yetkiler**

  - Kullanıcı: Kursları satın alabilir ve görüntüleyebilir.
  - Eğitmen: Kurs ekleyebilir ve yönetebilir.
    





**Notlar**

  - JWT Token: API uç noktalarını kullanırken, yetkilendirme gerektiren işlemler için Authorization başlığında Bearer <token> formatında bir token sağlamalısınız.
  - Refresh Token Mekanizması: Giriş yaptıktan sonra oturum süresi dolduğunda yeniden giriş yapmaya gerek kalmadan token yenileyebilirsiniz.




